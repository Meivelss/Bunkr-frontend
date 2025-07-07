import { mount } from "@vue/test-utils";
import TableComponent from "@/components/Table.vue";

describe("TableComponent mounts properly", () => {
  const wrapper = mount(TableComponent);
  it("Should mount the table conponent", () => {
    expect(wrapper.find("table").exists()).toBe(true);
  });
  it("Should render at least one column", () => {
    expect(wrapper.findAll("tbody tr").length).toBeGreaterThan(0);
  });
  it("Should render the number of found records", () => {
    expect(wrapper.text()).toMatch(/\d wyników/);
  });
});
