<template>
  <input
    class='calculator-input'
    type='text'
    :placeholder='placeholder'
    :value='rawValue'
    @input='calculateValue($event.target.value)'
  >
</template>

<script setup lang='ts'>
import {ref, watch} from "vue";

type TProps = {
  placeholder?: string,
  value: number | string
};
const props = defineProps<TProps>();

type TEmits = {
  (e: 'calculate', val: any): void
  (e: 'calculate-error', val: any): void
};
const emits = defineEmits<TEmits>();

const rawValue = ref<string>(props.value.toString());

function calculateValue(value: string) {
  rawValue.value = value
  const valid = value.split('').every((c: string) => '0123456789+-*/().'.includes(c))
  if (!valid) {
    emits('calculate-error', 'Используй *, /, +, - и (скобки) для операций, а точку — как десятичный разделитель')
    return;
  }
  try {
    // eslint-disable-next-line no-eval
    const calcValue = eval(value)
    emits('calculate', { value: calcValue, rawValue })
  } catch {
    emits('calculate-error', "¯\\_(ツ)_/¯")
  }
}

watch(() => props.value, (newVal) => {
  rawValue.value = newVal.toString();
})
</script>
