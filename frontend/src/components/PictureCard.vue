<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps<{ p: { id: string; title: string; artist: string; url: string; description?: string; bytes?: number } }>();
const router = useRouter();
function open() { router.push(`/picture/${props.p.id}`); }
function onload(e: Event) {
  const img = e.target as HTMLImageElement;
  const res = `${img.naturalWidth}×${img.naturalHeight}`;
  const el = (e.currentTarget as HTMLElement)?.closest("article");
  if (el) el.setAttribute("title", `Resolution: ${res}${props.p.bytes ? ` • Size: ${Math.round((props.p.bytes || 0) / 1024)} KB` : ""}`);
}
</script>

<template>
  <article class="card" @click="open">
    <img :src="p.url" :alt="p.title" @load="onload" />
    <h3>{{ p.title }}</h3>
    <p>{{ "By " + p.artist }}</p>
    <small class="muted">{{ p.description || 'Lorem ipsum dolor sit amet...' }}</small>
  </article>
</template>

<style scoped>
.card {
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: .5rem;
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-bottom: 2rem;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  box-sizing: border-box;
}

.muted {
  margin: 1rem;
  color: black;
  font-size: 14px;
}

article h3 {
  color: black;
  margin: 1rem;
  margin-bottom: 0;
  font-size: 24px;
}

article p {
  color: grey;
  margin: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  font-size: small
}
</style>
