async function getForum() {
   try {
      const res = await fetch("http://localhost:5222/blog");
      const data = await res.json();
      console.log(data);
   } catch (error) {
      console.error(error);
   }
}

getForum();
