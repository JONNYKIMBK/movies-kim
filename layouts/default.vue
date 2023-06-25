<template>
  <div class="bg-slate-800 text-white">
    <div class="flex flex-col items-center">
      <navbar />
    </div>
    <main class="p-3">
      <slot></slot>
    </main>

    <footer class="bg-slate-800">
      <links />
    </footer>
  </div>
</template>
