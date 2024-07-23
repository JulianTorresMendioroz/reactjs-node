export default function DataUsers () {

    fetch("http://localhost:8081/users")
        .then(data => data.json());
        console.log(data)
    return (
        <h1></h1>
    )
}