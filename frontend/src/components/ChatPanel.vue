<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import type { ChatMessage } from "../types";

const props = defineProps<{ pictureId: string }>();
const ws = ref<WebSocket | null>(null);
const inbox = ref<ChatMessage[]>([]);
const me = `User-${Math.floor(Math.random() * 1000)}`;

function connect() {
  ws.value = new WebSocket(`ws://localhost:4000/ws?pictureId=${props.pictureId}`);
  ws.value.onmessage = (e) => inbox.value.push(JSON.parse(e.data));
}
onMounted(connect);
onBeforeUnmount(() => ws.value?.close());

const text = ref("");
function send() {
  if (!text.value.trim()) return;
  const msg: ChatMessage = {
    pictureId: props.pictureId, author: me, text: text.value.trim(), ts: Date.now()
  };
  ws.value?.send(JSON.stringify(msg));
  text.value = "";
}
</script>

<template>
  <aside class="chat">
    <p>Chat</p>
    <div class="log">
      <div v-for="m in inbox" :key="m.ts" class="msg">
        <b>{{ m.author == me ? "Me" : m.author }}: </b> 
        <span>{{ m.text }}</span>
      </div>
    </div>
    <form class="composer" @submit.prevent="send">
      <input v-model="text" placeholder="Type your message here" />
      <button type="submit">Send</button>
    </form>
  </aside>
</template>

<style scoped>
p{
  box-sizing: border-box;
  background-color: rgba(220, 220, 220, 40%);
  padding: 0.4rem;
  margin: 0;
  width: 100%;
  border-radius: 12px 12px 0px 0px;
  font-size: 12px;
}
.chat {
  border: 2px solid rgba(200, 200, 200, 80%);
  border-radius: 12px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  height: auto;
  color: black;
}

.log {
  flex: 1;
  overflow: auto;
  padding: .5rem
}

.msg {
  padding: .75rem 0;
  padding-top: 0;
}

.composer {
  display: flex;
  gap: .5rem;
  margin: 1rem;
}

input {
  flex: 1;
  padding: .6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: transparent;
  color: black;
}

button {
  padding: .6rem .6rem;
  border: 0;
  background: #1f7aec;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
