import { createSignal } from "solid-js";

const handleTodo = () => {
    const [items, setItems] = createSignal<{ name: string; date: Date }[]>([]);

    const createItem = (name: string, date: Date) => {
        try {
            if (!name || !date) return Error;

            const cachedItems: { name: string; date: Date }[] = JSON.parse(localStorage.getItem("tasks") || "[]");
            const data = { name, date };

            cachedItems.push(data);

            localStorage.setItem("tasks", JSON.stringify(cachedItems));
            setItems(cachedItems);

            console.log(`Created new list item (${name})`)
            return true;
        } catch (err) {
            console.error("Failed to create new list item", err);
        }
    }

    const removeItem = (index: number) => {
        try {
            const cachedItems: { name: string; date: Date }[] = JSON.parse(localStorage.getItem("tasks") || "[]");

            console.log(`Removing ${cachedItems[index].name}...`);
            cachedItems.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(cachedItems));

            setItems(cachedItems);
        } catch (err) {
            console.error("Failed to delete item!", err);
        }
    }

    const updateItem = (index: number, name: string, date: Date) => { /* Might not be necessary tbh */
        try {
            const cachedItems: { name: string; date: Date }[] = JSON.parse(localStorage.getItem("tasks") || "[]");
            const data = { name, date };
            cachedItems[index] = data;
            console.log(`Updated ${name} to ${cachedItems[index].name}`)
        } catch (err) {
            console.error(`Failed to update item ${name}`)
        }
    }

    const removeAllItems = () => {
        try {
            localStorage.clear();
            setItems([]);
            console.log("Cleared local storage")
        } catch (err) {
            console.error("Failed to clear local storage", err);
        }

    }

    const getItems = () => {
        setItems(JSON.parse(localStorage.getItem("tasks") || "[]"));
    }

    return { createItem, removeItem, removeAllItems, getItems, items };
}

export { handleTodo };