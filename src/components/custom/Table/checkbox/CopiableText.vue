<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.label);
};
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <Button
        @click="copyToClipboard"
        class="hover:bg-secondary-hover/80 h-min cursor-pointer bg-transparent py-1 text-xs shadow-none hover:shadow-sm"
      >
        {{ props.label.slice(0, 12) }}
      </Button>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <ContextMenuLabel>{{ props.label }}</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem> Szybka Edycja </ContextMenuItem>
      <ContextMenuItem> Edycja </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
