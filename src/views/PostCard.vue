<template>
  <article class=" max-w-sm mx-auto bg-grey-500 p-4 rounded-lg shadow-md border border-[#626060]">
    <div class="header flex justify-between items-center mb-4">
      <span class="author font-bold text-gray-800">Crypto-Academy</span>
      <span class="time text-gray-500 text-sm">5h</span>
    </div>

    <div class="content">
      <h1 class="text-purple-600 text-2xl mb-2">#Pinetwork</h1>
      <p class="text-gray-600 text-base leading-relaxed mb-4">
        Great News for Pioneers! Pi Network is officially transitioning to the Open Network on
        <strong class="font-semibold text-black">February 20, 2025, at 8:00 AM UTC</strong>!
      </p>
    </div>

    <div class="footer flex justify-between items-center">
      <button class="add-comment bg-purple-600 text-white py-2 px-4 rounded-md text-sm hover:bg-purple-700">
Read More
      </button>
      <div class="stats flex gap-4">
        <span class="text-gray-500 text-sm">80</span>
        <span class="text-gray-500 text-sm">308</span>
        <span class="text-gray-500 text-sm">64</span>
        <span class="text-gray-500 text-sm">40</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "postCard",
};
</script>

<style scoped>
/* Tailwind CSS handles the styling, so no additional styles are required here */
</style>
