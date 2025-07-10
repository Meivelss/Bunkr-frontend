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
  getFilteredRowModel,
} from "@tanstack/vue-table";
// ✨ Import the type for column filter state
import type { FilterFn, ColumnFiltersState } from "@tanstack/vue-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ColumnInput from "@/components/custom/Table/checkbox/ColumnInput.vue";
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

/* necessary for tanstack */
const columnHelper = createColumnHelper<Item>();

const filterQuery = ref("");
// ✨ State for the per-column filters
const columnFilters = ref<ColumnFiltersState>([]);

/* available page sizes */
const pageSizes = [10, 25, 50, 75, 100];

/* data to render in table */
const data = ref(defaultData);

const page = computed({
  get: () => table.getState().pagination.pageIndex + 1,

  set: (value) => {
    table.setPageIndex(value - 1);
  },
});

/* tanstack columns definition */
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
    header: () => "ID Obiektu",
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
 * table filtering function
 */
const fuzzyFilter: FilterFn<Item> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

/**
 * tanstack table
 */
const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: fuzzyFilter,
  // ✨ Enable column filtering
  enableColumnFilters: true,
  // ✨ Add handler to update state when column filters change
  onColumnFiltersChange: (updater) => {
    columnFilters.value =
      typeof updater === "function" ? updater(columnFilters.value) : updater;
  },
  state: {
    get globalFilter() {
      return filterQuery.value;
    },
    // ✨ Add columnFilters to the table state
    get columnFilters() {
      return columnFilters.value;
    },
  },
});

/**
 * amount of items to display on table page
 */
const pageSize = ref(table.getState().pagination.pageSize);

/**
 * monitor changes in table page size
 */
watch(pageSize, (newSize) => {
  table.setPageSize(Number(newSize));
});
</script>

<template>
  <div class="flex h-full w-full flex-col space-y-4">
    <div class="flex items-center justify-between">
      <Breadcrumb />
      <div class="flex items-center justify-center gap-2">
        <Input
          v-model="filterQuery"
          placeholder="Szukaj globalnie..."
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
                :value="String(value)"
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
              class="px-4 py-3 text-center"
            >
              <div v-if="!header.isPlaceholder">
                <!-- <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                /> -->
                <div v-if="header.column.getCanFilter()" class="mt-2">
                  <ColumnInput
                    :value="(header.column.getFilterValue() as string) ?? ''"
                    @input="header.column.setFilterValue($event.target.value)"
                    :placeholder="
                      typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header()
                        : (header.column.columnDef.header as string)
                    "
                    class="h-7 text-center text-xs"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            v-for="(row, i) in table.getRowModel().rows"
            class="group hover:bg-primary-hover transition-colors"
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
        {{ table.getFilteredRowModel().rows.length }} wyniki
      </p>
      <div class="h-20 w-full" />
      <Pagination
        v-model:page="page"
        :items-per-page="pageSize"
        :total="table.getFilteredRowModel().rows.length"
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
