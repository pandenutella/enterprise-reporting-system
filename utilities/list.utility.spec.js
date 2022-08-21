const { sortObjectsByProperty } = require("./list.utility");

describe("List Utility", () => {
  describe("sortObjectsByProperty", () => {
    it("should sort array of objects by their property ascending given property and no descending", () => {
      const objects = [{ name: "C" }, { name: "A" }, { name: "B" }];

      const sortedObjects = objects.sort(sortObjectsByProperty("name"));

      expect(sortedObjects).toEqual([
        { name: "A" },
        { name: "B" },
        { name: "C" },
      ]);
    });

    it("should sort array of objects by their property ascending given property and descending is false", () => {
      const objects = [{ name: "C" }, { name: "A" }, { name: "B" }];

      const sortedObjects = objects.sort(sortObjectsByProperty("name"));

      expect(sortedObjects).toEqual([
        { name: "A" },
        { name: "B" },
        { name: "C" },
      ]);
    });

    it("should sort array of objects by their property descending given property and descending is true", () => {
      const objects = [{ name: "C" }, { name: "A" }, { name: "B" }];

      const sortedObjects = objects.sort(sortObjectsByProperty("name", true));

      expect(sortedObjects).toEqual([
        { name: "C" },
        { name: "B" },
        { name: "A" },
      ]);
    });
  });
});
