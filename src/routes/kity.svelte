<script lang="ts">
    const getNewKity = ()=>{
        if (!document.getElementById("kity")) return;
        if (!document.getElementById("moarkity")) return;
        const i = document.getElementById("kity");
        const b = document.getElementById("moarkity")
        i.setAttribute("src", `http://placekitten.com/${Math.floor(Math.random() * 600 + 200)}`);
        b.innerText = "geting kity...";
        b.setAttribute("disabled", "");
        i.onload = ()=>{
            b.innerText = "get mor kity";
            b.removeAttribute("disabled");
        };
    }
</script>

<section>
    <img src="http://placekitten.com/{Math.floor(Math.random() * 600 + 200)}" alt="kity" id="kity">
    <br>
    <button on:click="{()=>{ getNewKity(); }}" id="moarkity">get mor kity</button>
</section>