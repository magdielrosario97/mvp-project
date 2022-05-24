async function getForum() {
   try {
      const res = await fetch("https://formula1-blog.herokuapp.com/");
      const data = await res.json();
      console.log(data);
   } catch (error) {
      console.error(error);
   }
}
