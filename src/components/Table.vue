<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationLast,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
defineOptions({ name: "TableComponent" });
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import defaultData from "@/randomized_items.json";
import { watch, computed, ref, h } from "vue";
import { RotateCcw } from "lucide-vue-next";
import DetailsButton from "@/components/custom/Table/checkbox/DetailsButton.vue";
import RentageStatus from "@/components/custom/Table/checkbox/RentageStatus.vue";
import CopiableText from "@/components/custom/Table/checkbox/CopiableText.vue";

/* storage item type */
type Item = {
  generalId: string;
  itemId: string;
  name: string;
  building: string;
  chamber: string;
  shelf: string;
  shelfLevel: string;
  comment: string;
  photo: string;
  isRented: boolean;
  rentedBy: string;
};

/* necessary for tanstacc */
const columnHelper = createColumnHelper<Item>();

/* available page sizes */
const pageSizes = [10, 25, 50, 75, 100];

/* data to render in table */
const data = ref(defaultData);

/* nie wiem jak to dziala ale llm takie dal i dziala, pozniej sie zastanowie o co chodzi */
const page = computed({
  get: () => table.getState().pagination.pageIndex + 1,

  set: (value) => {
    table.setPageIndex(value - 1);
  },
});

/* tanstacc columns definition */
const columns = [
  {
    /* row index */
    id: "index",
    enableHiding: false,
    cell: (info: any) =>
      h(
        "span",
        {
          class: "text-xs text-primary-text",
        },
        info.row.index + 1,
      ),
  },
  columnHelper.accessor("generalId", {
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue().slice(0, 5),
      }),
    header: () => "ID",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.itemId, {
    id: "itemId",
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
      }),
    header: () => "ID Przedmiotu",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
      }),
    header: () => "Nazwa",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("isRented", {
    header: () => "Stan",
    cell: (info) => {
      const isRented = info.getValue();

      return h(RentageStatus, {
        variant: isRented ? "rented" : "available",
      });
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("building", {
    header: "Budynek",
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
      }),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("chamber", {
    header: "Komora",
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
      }),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("shelf", {
    header: "Półka",
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
      }),
    footer: (props) => props.column.id,
  }),
  {
    id: "actions",
    enableHiding: false,
    cell: (info: any) =>
      h(
        "div",
        {
          class:
            "flex justify-end group-hover:opacity-100 opacity-0 transition-opacity duration-300",
        },
        h(DetailsButton, {
          rowIndex: info.row.index + 1,
          ariaLabel: "Row actions",
        }),
      ),
  },
];

/**
 * shuffles array, for development purposes mostly
 * @param array - data to shuffle
 * @returns shuffled array
 * @deprecated
 */
function shuffle(array: any[]) {
  let newArray = array.slice();
  let currentIndex = newArray.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

/**
 * we don't really need this one
 */
const rerender = () => {
  data.value = shuffle(defaultData);
};

/**
 * tanstacc table
 */
const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

/**
 * amount of items to display on table page
 */
const pageSize = ref(table.getState().pagination.pageSize);

/**
 * monitor changes in table page size
 */
watch(pageSize, (newSize) => {
  console.log("old size:", table.getState().pagination.pageSize);
  table.setPageSize(Number(newSize));
});
</script>

<template>
  <div class="flex h-full w-full flex-col space-y-4">
    <div class="flex items-center justify-between">
      <Breadcrumb />
      <div class="flex items-center justify-center gap-2">
        <Input
          placeholder="Szukaj"
          class="font-body border-primary-border h-8 w-2xs shadow-md"
        />
        <Select v-model="pageSize">
          <SelectTrigger class="font-body border-primary-border w-18 shadow-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            class="font-body border-primary-border bg-white shadow-md"
          >
            <SelectGroup>
              <SelectLabel class="text-primary-text"
                >Elementów na stronie...</SelectLabel
              >
              <SelectItem
                v-for="value in pageSizes"
                :key="value"
                :value="value"
                >{{ value }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          size="icon"
          @click="rerender"
          class="hover:text-secondary bg-secondary h-8 w-8 text-white"
          ><RotateCcw
        /></Button>
      </div>
    </div>
    <div
      style="
        mask-image: linear-gradient(
          to bottom,
          transparent,
          black 20px,
          black calc(100% - 20px),
          transparent
        );
        mask-mode: alpha;
      "
      class="min-h-0 w-full flex-1 overflow-y-auto"
    >
      <table class="font-body text-secondary-text min-w-full text-left text-sm">
        <thead class="text-xs font-bold uppercase">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="px-4 py-6 text-center"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            v-for="(row, i) in table.getRowModel().rows"
            class="group transition-colors hover:bg-neutral-200"
            :key="row.id"
            :class="{
              'bg-neutral-100': i % 2 === 0,
            }"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-2 text-center"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center gap-2">
      <p class="font-body text-secondary-text p-8 text-sm whitespace-nowrap">
        {{ data.length }} wyniki
      </p>
      <div class="h-20 w-full" />
      <Pagination
        v-model:page="page"
        :items-per-page="pageSize"
        :total="data.length"
        v-slot="{ page: componentPage }"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationFirst />
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === componentPage"
            >
              {{ item.value }}
            </PaginationItem>
          </template>
          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
      <Button
        size="icon"
        @click="rerender"
        class="hover:text-secondary bg-secondary h-8 w-8 text-white"
        ><RotateCcw
      /></Button>
    </div>
  </div>
</template>
