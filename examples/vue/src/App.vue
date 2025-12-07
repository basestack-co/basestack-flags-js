<script setup lang="ts">
import { FlagsSDK, type Flag } from "../../../dist";
import { onMounted, ref } from "vue";

const sdk = new FlagsSDK({
  baseURL: "https://flags-api.basestack.co/v1",
  projectKey: "cmi66kums00020mpq5rw7ezx9",
  environmentKey: "cmi66kumz00040mpqps87kxn8",
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
