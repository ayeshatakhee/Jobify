function deleteProduct(id) {
    const result = confirm('Are you sure you want to delete');
    console.log(result);
    console.log(id);
    if(result){
        fetch('/delete-product/'+id,{
            method : 'POST'
        }).then((res) => {
            if(res.ok){
                location.reload(); 
            }
        })
    }
}