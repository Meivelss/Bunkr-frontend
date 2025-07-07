import { mount } from "@vue/test-utils";
import TableComponent from "@/components/Table.vue";

describe("TableComponent tests", () => {
  const wrapper = mount(TableComponent);
  it("should mount the table conponent", () => {
    expect(wrapper.find("table").exists()).toBe(true);
  });
  it("should render at least one column", () => {
    expect(wrapper.findAll("tbody tr").length).toBeGreaterThan(0);
  });
  it("should render the number of found records", () => {
    expect(wrapper.text()).toMatch(/\d wyników/);
  });
});
