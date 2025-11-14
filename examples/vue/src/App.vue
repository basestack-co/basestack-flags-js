<script setup lang="ts">
import { FlagsSDK, type Flag } from "../../../dist";
import { onMounted, ref } from "vue";

const sdk = new FlagsSDK({
  baseURL: "http://localhost:4000/v1",
  projectKey: "cmhj9vgjl000svj8oed92qi9u",
  environmentKey: "cmhj9vgjo000uvj8ogf2m2fug",
});

const loading = ref(true);
const errorMessage = ref("");
const flag = ref<Flag | null>(null);

onMounted(async () => {
  try {
    flag.value = await sdk.getFlag("header");
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main>
    <h1>Flags Vue Example</h1>
    <p v-if="loading">Fetching flag...</p>
    <p v-else-if="errorMessage" class="error">Failed: {{ errorMessage }}</p>
    <section v-else-if="flag">
      <p>
        Flag <code>{{ flag.slug }}</code> is
        <strong>{{ flag.enabled ? "enabled" : "disabled" }}</strong>
      </p>
      <pre>{{ JSON.stringify(flag.payload, null, 2) }}</pre>
    </section>
  </main>
</template>
