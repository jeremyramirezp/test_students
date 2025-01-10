import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "./components";
import { FormValues, schema } from "./models";

const FormModal = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <InputForm name="first_name" control={control} label="Nombre" type="text" error={errors.first_name} />
            <InputForm name="last_name" control={control} label="Apellido" type="text" error={errors.last_name} />

        </form>
    );

}

export default FormModal;