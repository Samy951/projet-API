import Form from "./components/Form.tsx";


const App = () => {
    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-10">Certificat Médical</h1>
            <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <Form/>
            </div>
        </>


    )
}

export default App