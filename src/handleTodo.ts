import { createSignal } from "solid-js";

const handleTodo = () => {
    const [items, setItems] = createSignal<{ name: string; date: Date }[]>([]);

    const createItem = (name: string, date: Date) => {
        try {
            if (!name || !date) return false;

            const items: { name: string; date: Date }[] = JSON.parse(localStorage.getItem("items") || "[]");
            const data = { name, date };

            items.push(data);

            localStorage.setItem("items", JSON.stringify(items));
            setItems(items);

            console.log(`Created new list item (${name})!`)
            return true;
        } catch (err) {
            console.warn("Failed to create new list item", err);
            return false;
        }
    }

    const removeItem = (index: number) => {
        const items = JSON.parse(localStorage.getItem("items") || "[]");
        console.log(`Removing ${items[index].name}...`);

        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        setItems(items);
    }

    /*const updateItem = () => {

    }*/

    const removeAllItems = () => {
        localStorage.clear();
        setItems([]);
    }

    const getItems = () => {
        setItems(JSON.parse(localStorage.getItem("items") || "[]"));
    }

    return { createItem, removeItem, removeAllItems, getItems, items };
}

export { handleTodo };