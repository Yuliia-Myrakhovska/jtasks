import Dexie from "dexie";

export const bd = new Dexie("todoList");

bd.version(1).stores({
  cardinfo: "++id,titleCard,dateCard,ArrayList",
});
