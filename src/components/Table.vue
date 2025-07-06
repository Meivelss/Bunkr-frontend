<script setup lang="ts">
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DetailsButton from "./custom/Table/checkbox/DetailsButton.vue";
// import defaultData from "@/components/tableData.json";
import defaultData from "src/randomized_items.json";
import { watch, ref, h } from "vue";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-vue-next";
import CopiableText from "./custom/Table/checkbox/CopiableText.vue";

// const INITIAL_PAGE_INDEX = 0;

type Thing = {
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

const columnHelper = createColumnHelper<Thing>();
// const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const pageSizes = [8, 10, 12, 16, 20];
const data = ref(defaultData);

const columns = [
  columnHelper.accessor("generalId", {
    cell: (info) =>
      h(CopiableText, {
        label: info.getValue(),
        ariaLabel: "Row actions",
      }),
    header: () => "ID",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.itemId, {
    id: "itemId",
    cell: (info) => info.getValue(),
    header: () => "ID Przedmiotu",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
    header: () => "Nazwa",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("isRented", {
    header: () => "Stan",
    cell: (info) => {
      const isRented = info.getValue();

      return h(
        "div",
        {
          class: [
            "rounded-full font-bold text-xs uppercase border flex items-center justify-center w-full h-full px-2 py-1",
            isRented
              ? "text-yellow-800 bg-yellow-300/50 border-yellow-500"
              : "text-green-800 bg-green-300/50 border-green-500",
          ].join(" "),
        },
        isRented ? "Wypożyczony" : "Dostępny",
      );
    },
    footer: (props) => props.column.id,
  }),
  // columnHelper.accessor("comment", {
  //   header: "Komentarz",
  //   footer: (props) => props.column.id,
  // }),
  columnHelper.accessor("building", {
    header: "Budynek",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("chamber", {
    header: "Komora",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("shelf", {
    header: "Półka",
    footer: (props) => props.column.id,
  }),
  {
    id: "actions",
    enableHiding: false,
    cell: () =>
      h(
        "div",
        {
          class:
            "flex justify-end group-hover:opacity-100 opacity-0 transition-opacity duration-300",
        },
        h(DetailsButton, {
          class: "",
          ariaLabel: "Row actions",
        }),
      ),
  },
];

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

const rerender = () => {
  data.value = shuffle(defaultData);
};

// function handleGoToPage(e: any) {
//   const page = e.target.value ? Number(e.target.value) - 1 : 0;
//   goToPageNumber.value = page + 1;
//   table.setPageIndex(page);
// }

// const handlePageSizeChange = (e: any) => {
//   console.log("current page size: ", table.getState().pagination.pageSize);
//   table.setPageSize(Number(e.target.value));
// };

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

const pageSize = ref(table.getState().pagination.pageSize);

watch(pageSize, (newSize) => {
  console.log("old size:", table.getState().pagination.pageSize);
  table.setPageSize(Number(newSize));
});
</script>

<template>
  <div class="flex h-full w-full flex-col space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="font-header text-2xl font-bold">{{ data.length }} wyników</h1>
      <div class="flex items-center justify-center gap-2">
        <Input
          placeholder="Szukaj"
          class="font-body h-8 w-2xs border-neutral-300 shadow-md"
        />
        <Select v-model="pageSize">
          <SelectTrigger class="font-body w-18 border-neutral-300 shadow-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            class="font-body border-neutral-300 bg-white shadow-md"
          >
            <SelectGroup>
              <SelectLabel class="text-gray-400"
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
          @click="() => table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          class="hover:text-secondary bg-secondary h-8 w-8 text-white"
          ><ChevronLeft
        /></Button>
        <Button
          size="icon"
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
          class="hover:text-secondary bg-secondary h-8 w-8 text-white"
          ><ChevronRight
        /></Button>
        <Button
          size="icon"
          @click="rerender"
          class="hover:text-secondary bg-secondary h-8 w-8 text-white"
          ><RotateCcw
        /></Button>
      </div>
    </div>
    <div class="h-full w-full">
      <table class="font-body min-w-full text-left text-sm">
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
        <!-- TODO: Text to left/right for first/last cells -->
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
  </div>
</template>
