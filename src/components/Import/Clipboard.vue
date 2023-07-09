<template>
  <div class="flex flex-col">
    <button
      type="button"
      class="drac-btn drac-border-green drac-btn-outline drac-text-green"
      @click="importActivities()"
    >
      Import from clipboard
    </button>
    <span class="text-xs drac-text-grey-secondary p-2">Currently only html table is supported.</span>
  </div>
</template>

<script setup lang="ts">
import type { ActivityInterface } from '@/interfaces/Activity';
import useActivitiesStore from '@/stores/activities';
import {
  calcExpectedTime,
  calcStandardDeviationOfTime,
  getHighestActivityId,
  round,
  toPropertyType,
} from '@/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { get } from '@vueuse/core';

const supportedTypes = ['text/html'];

const emit = defineEmits<{
  (e: 'import-success', warnings: Array<string>): void,
  (e: 'import-failure', errors: Array<string>): void,
}>();

const activitiesStore = useActivitiesStore();

const activityTemplate: ActivityInterface = {
  id: 0,
  title: '',
  optimistic: 0,
  mostLikely: 0,
  pessimistic: 0,
  expectedTime: 0,
  standardDeviationOfTime: 0,
};

const errors = ref<Array<string>>([]);
const warnings = ref<Array<string>>([]);

function addWarning(message: string): void {
  warnings.value.push(message);
}

function addError(message: string): void {
  errors.value.push(message);
}

function parseActivityProperty(header: string): string | undefined {
  for (const prop of Object.getOwnPropertyNames(activityTemplate)) {
    if (header.toLowerCase().replace(/\s/g, '').includes(prop.toLowerCase())) {
      return prop;
    }
  }
}

function tryParseActivitiesFromTable(html: Element): Array<ActivityInterface> {
  const activities: Array<ActivityInterface> = [];
  const headerRow = html.querySelector('thead tr');
  const activityRows = html.querySelectorAll('tbody tr');

  if (headerRow === null || activityRows.length < 1) {
    if (headerRow === null) {
      addError('Could not find a header row (selector: "thead tr").');
    }

    if (activityRows.length < 1) {
      addError('Could not find rows in tbody (selector: "tbody tr").');
    }

    return activities;
  }

  const headers = Array.from(headerRow.children);
  Array.from(activityRows).forEach((activityRow, rowIndex) => {
    let activity: ActivityInterface = Object.assign({}, activityTemplate);
    activity.id = rowIndex;

    Array.from(activityRow.children).forEach((value, index) => {
      const property = parseActivityProperty((headers[index] as HTMLElement).innerText);
      if (property === undefined) {
        addWarning(`Cannot map ${(headers[index] as HTMLElement).innerText} to an activity property.`);

        return;
      }

      const prop = property as keyof ActivityInterface;
      activity[prop] = toPropertyType(activity[prop], (value as HTMLElement).innerText);
    });

    if (activity.expectedTime === activityTemplate.expectedTime) {
      activity.expectedTime = round(calcExpectedTime(activity.optimistic, activity.mostLikely, activity.pessimistic));
    }

    if (activity.standardDeviationOfTime === activityTemplate.standardDeviationOfTime) {
      activity.standardDeviationOfTime = round(calcStandardDeviationOfTime(activity.pessimistic, activity.optimistic))
    }

    if (_.isEqual(activityTemplate, activity)) {
      addError(`Unable to parse activity from row ${rowIndex}.`);
      return;
    }

    activities.push(activity);
  });

  return activities;
}

function tryParseActivitiesFromHtml(text: string): Array<ActivityInterface> {
  const template = document.createElement('template');
  template.innerHTML = text;
  const html = template.content.firstChild as Element;
  const table = html.nodeName === 'TABLE' ? html : html.querySelector('table');

  if (table) {
    return tryParseActivitiesFromTable(table);
  }

  addError('Could not find a table.')

  return [];
}

function importActivities() {
  navigator.clipboard.read().then(async (clipboardItems: ClipboardItem[]) => {
    for (const clipboardItem of clipboardItems) {
      if (_.intersection(supportedTypes, clipboardItem.types).length > 0) {
        for (const type of supportedTypes) {
          const blob = await clipboardItem.getType(type);
          const text = await blob.text();
          if (type === 'text/html') {
            const activities = tryParseActivitiesFromHtml(text);
            if (activities.length > 0) {
              activitiesStore.$patch({
                activityId: getHighestActivityId(activities),
                activities: activities,
              });

              emit('import-success', get(warnings));
            } else {
              emit('import-failure', get(errors));
            }

            // Currently only text/html is supported so no need to continue
            return;
          }
        }
      } else {
        addError(`Unsupported clipboard types "${clipboardItem.types.join(', ')}".`);
        emit('import-failure', get(errors));
      }

      // Only one item is supported.
      return;
    }
  })
}
</script>
