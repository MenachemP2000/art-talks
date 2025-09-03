<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ChatPanel from "../components/ChatPanel.vue";
import type { Picture } from "../types";

const route = useRoute();
const id = route.params.id as string;
const pic = ref<Picture | null>(null);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:4000/api/pictures");
    const all: Picture[] = await res.json();
    pic.value = all.find(p => p.id === id) || null;
  } catch {
    pic.value = { id, title: "Local Placeholder", artist: "Unknown", url: "https://picsum.photos/seed/fallback/800/600" };
  }
});
</script>

<template>
  
  <h2 v-if="pic">{{ pic.title }}<span class="muted"> by {{ pic.artist }}</span></h2>
  <div class="page" v-if="pic">
    <div class="imagePane">
      <img :src="pic.url" :alt="pic.title" />
    </div>
    <ChatPanel :picture-id="pic.id" />
  </div>
</template>

<style scoped>
h2{
  padding: 0;
  margin: 0;
  padding-right: 5%;
  padding-left: 5%;
  padding-bottom: 0.5rem;
  padding-top: 1rem;
  color: black;
  font-size: 40px;
}
.page {
  display: grid;
  grid-template-columns: 1.48fr .52fr;
  gap: 1rem;
  max-width: 100%;
  padding-right: 5%;
  padding-left: 5%;
}
.imagePane img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  padding: 0;
  margin: 0;
}

.muted {
  color: #666;
  font-size: small;
  font-weight: normal;
}

@media (max-width:900px) {
  .page {
    grid-template-columns: 1fr
  }
}
</style>
