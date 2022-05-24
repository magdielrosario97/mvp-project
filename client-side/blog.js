async function getForum() {
   try {
      const res = await fetch("http://localhost:5222/", { mode: "no-cors" });
      const data = await res.json();
      console.log(data);
   } catch (error) {
      console.error(error);
   }
}

getForum();
