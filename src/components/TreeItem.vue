<template>
  <div class="d-flex tree-item" :style="{ 'padding-left': `${depth * 10}px` }"  >
    <div @click="nodeClicked" class="expandandcolapse"></div>
    <img v-if="node.icon" class="svg" :src="node.icon" />
    <span @click="clickHandle(node)" > {{ node.name }}</span>
  </div>
  <template v-if="expanded">
    <TreeItem
      @treeitem-click="clickHandle"
      v-for="child in node.children"
      :key="child.name"
      :depth="depth + 1"
      :node="child"
    />
  </template>
</template>

<script>
export default {
  name: "TreeItem",
  emits: ["treeitem-click"],
  props: {
    node: {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: false,
      },
      children: {
        type: Array,
        default: () => [],
      },
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: true,
    };
  },
  methods: {
    clickHandle(evt) {
      this.$emit('treeitem-click', evt);
    },
    nodeClicked() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
<style>
.expandandcolapse {
  font: normal normal normal 16px/1 codicon;
  min-width: 20px;
  content: "\eab4";
}
img.svg {
  width: 20px;
  margin: 0 4px;
}
.tree-item:hover {
  color: #2ed058 !important;
  user-select: none;
  background-color: #39414a !important;
  cursor: pointer;
}
</style>
