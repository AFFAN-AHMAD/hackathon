<form onSubmit={handleSubmit}>
  <box>
    {" "}
    <label>image url</label>
    <input
      placeholder="image url"
      name="url"
      onChange={(e) => setImg(e.target.value)}
    />
  </box>
  <box>
    {" "}
    <label>height</label>
    <input placeholder="height" onChange={(e) => setHeight(e.target.value)} />
  </box>
  <box>
    {" "}
    <label>width</label>
    <input placeholder="width" onChange={(e) => setWidth(e.target.value)} />
  </box>

  <button>save</button>
</form>;
