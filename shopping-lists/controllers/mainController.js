import { executeQuery } from "../database/database.js";

const showIndex = async ({ response, render, state }) => {
    //response.body="<h1>Shared shopping lists</h1>";
 
    render("index.eta","zaz");
}
const showLists = async ({ response, render, state }) => {
    //response.body="<h1>Shared shopping lists</h1>";
    var lists = await executeQuery("SELECT * FROM shopping_lists WHERE active = TRUE");
    //console.log(lists);
    render("lists.eta",lists);
}
const addList = async ({ request,response, render, state }) => {
    const body = request.body();
    const params = await body.value;
    const name = params.get("name");

    //console.log(name);
    //response.body=name;
    await executeQuery('INSERT INTO shopping_lists (name) VALUES ($1)',name);
    response.redirect("/lists");
}
const deactivateList = async (ctx)=>{
    let data=ctx.params;
    console.log(data.id);
    ctx.response.redirect("/lists");
}
const showList = async (ctx)=>{
    let data=await ctx.params;
    let template_data={name:"",items:NaN,id:0}

    //await executeQuery('UPDATE shopping_lists SET active=FALSE WHERE id=$1',data.id);
    let items=await executeQuery('SELECT * FROM shopping_list_items WHERE shopping_list_id = $1',data.id);
    let list = await executeQuery('SELECT * FROM shopping_lists WHERE id = $1',data.id);
    console.log(list);
    template_data.name=list.rows[0].name;
    template_data.id=list.rows[0].id;
    template_data.items=items;
    console.log(template_data.items);
    
    //ctx.response.body=data.id;
    ctx.render("list.eta",template_data);
}
const addItem = async (ctx)=>{
    let data=ctx.params;
    let body=await ctx.request.body().value;
    let post_name=await body.get("name");
 
    await executeQuery('INSERT INTO shopping_list_items (shopping_list_id,name) VALUES ($1,$2)',data.id,post_name);
    //ctx.response.redirect("/lists/"+data.id);
    console.log("/lists/"+data.id);
    ctx.response.body="Here";

}

export { showIndex,showLists,addList,showList,deactivateList,addItem };
