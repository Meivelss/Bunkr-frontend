import { mount } from "@vue/test-utils";
import TableComponent from "@/components/Table.vue";

test("TableComponent mounts properly", () => {
  const wrapper = mount(TableComponent);

  expect(wrapper.find("table").exists()).toBe(true);
  expect(wrapper.findAll("tbody tr").length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain("wyników");
});
