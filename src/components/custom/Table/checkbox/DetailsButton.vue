<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wrench, Copy, FileJson2, Trash } from "lucide-vue-next";

const props = defineProps({
  rowIndex: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="w-8 cursor-pointer bg-transparent shadow-none hover:bg-white/80 hover:shadow-sm"
      >
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>Row</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Wrench class="mr-2 h-4 w-4" />
          <span>Edit</span>
          <!-- <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy class="mr-2 h-4 w-4" />
          <span>Copy</span>
          <!-- <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileJson2 class="mr-2 h-4 w-4" />
          <span>Copy as JSON</span>
          <!-- <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash class="mr-2 h-4 w-4" />
          <span>Delete</span>
          <!-- <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <!-- <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard class="mr-2 h-4 w-4" />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users class="mr-2 h-4 w-4" />
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus class="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail class="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare class="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle class="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Plus class="mr-2 h-4 w-4" />
          <span>New Team</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem> -->
      </DropdownMenuGroup>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Github class="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Cloud class="mr-2 h-4 w-4" />
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
      -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
