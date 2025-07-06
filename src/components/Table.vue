<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import defaultData from "@/components/tableData.json";
import { ref } from "vue";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const columnHelper = createColumnHelper<User>();
const pageSizes = [8, 10, 12, 16, 20];
const data = ref(defaultData);

const columns = [
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => "Last Name",
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => "Visits",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

const rerender = () => {
  data.value = defaultData;
};

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="flex h-full w-full flex-col space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="font-header text-2xl font-bold">{{ data.length }} wyników</h1>
      <Input
        placeholder="Szukaj"
        class="font-body h-8 w-xs border-neutral-300 shadow-md"
      />
      <div class="flex items-center justify-center gap-2">
        <Button
          @click="rerender"
          class="font-body bg-secondary hover:text-secondary h-8 w-auto font-bold text-white"
          >Odśwież</Button
        >
        <Button
          class="font-body bg-secondary hover:text-secondary h-8 w-auto font-bold text-white"
          >Inny przycisk</Button
        >
        <Button
          class="font-body bg-secondary hover:text-secondary h-8 w-auto font-bold text-white"
          >Wolololo</Button
        >
      </div>
    </div>
    <div class="h-full w-full">
      <table
        class="font-body min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700"
      >
        <thead
          class="bg-gray-100 text-xs font-semibold text-gray-600 uppercase"
        >
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="px-4 py-3 text-left"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="transition-colors hover:bg-gray-50"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-2"
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
