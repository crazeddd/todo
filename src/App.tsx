import type { Component } from 'solid-js';
import { createSignal, For, onMount } from "solid-js";

import { handleTodo } from './handleTodo';

const App: Component = () => {
  const { createItem, removeItem, getItems, items } = handleTodo();

  const [name, setName] = createSignal("");
  const [date, setDate] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);


  onMount(() => {
    getItems();
  })

  return (
    <>
      <div class="wrapper secondary gp-2">
        <div class="row nav center">
          <h5>{items().length} Tasks Left</h5>
          <div class="button-wrapper row">
            <button onclick={() => setIsOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg></button>
            <button class="primary circle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg></button>
          </div>
        </div>

        <div class="todo">
          <For each={items()}>
            {(item: { name: string, date: Date }, index) =>
              <div data-key={index()} class="todo-item center">
                <p><b>{item.name}</b></p>
                {<p class="muted">{new Date(item.date).toDateString()}</p>}
                <div class="delete" onclick={() => removeItem(index())}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></div>
              </div>
            }
          </For>
        </div>
      </div>

      {isOpen() && <div class="modal secondary column gp-3">
        <button class="close" onclick={() => setIsOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg></button>
        <h5>Create Task</h5>
        <input
          type="text"
          placeholder='Name'
          value={name()}
          onChange={(e) => setName(e.currentTarget.value)}
        ></input>
        <input
          type="date"
          placeholder='Date'
          value={date()}
          onChange={(e) => setDate(e.currentTarget.value)}
        ></input>
        <button class="primary" onclick={() => { createItem(name(), new Date(date())) ? setIsOpen(false) : "e" }}>Create</button>
      </div>}
    </>
  );
};

export default App;
