<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import PictureCard from "../components/PictureCard.vue";
import type { Picture } from "../types";

const q = ref("");
const items = ref<Picture[]>([]);
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:4000/api/pictures");
    items.value = await res.json();
  } catch {
    // fallback hardcoded items if backend isn't running
    items.value = [
      { id: "local-1", title: "Local Placeholder", artist: "Unknown", url: "https://picsum.photos/seed/loc1/800/600" }
    ];
  }
});
const filtered = computed(() => {
  const s = q.value.toLowerCase().trim();
  if (!s) return items.value;
  return items.value.filter(p =>
    p.title.toLowerCase().includes(s) || p.artist.toLowerCase().includes(s)
  );
});
</script>

<template>
  <div class="container">
    <input v-model="q" placeholder="What are you looking for?" />
    <div class="grid">
      <PictureCard v-for="p in filtered" :key="p.id" :p="p" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  margin-right: 1%;
  margin-left: 1%;
  margin: auto;
  padding: 2.5%;
  padding-top: 1.5%;
}

.grid {
  margin: 1%;
  padding-bottom: 1%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 4%;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: .6rem;
  padding-left: 2rem;
  border: 2px solid black;
  border-radius: 16px;
  background-color: white;
  margin: 0;
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M10 2a8 8 0 015.29 13.71l5 5a1 1 0 01-1.42 1.42l-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/></svg>') no-repeat 8px center;
  background-size: 16px;
}
</style>
