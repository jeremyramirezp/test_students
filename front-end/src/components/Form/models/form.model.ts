import { z } from "zod";

export const schema = z.object({
    first_name: z
      .string()
      .min(1, 'El nombre es obligatorio.')
      .max(50, 'El nombre no puede tener más de 50 caracteres.')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios."),

    last_name: z
      .string()
      .min(1, 'El apellido es obligatorio')
      .max(50, 'El apellido no puede tener más de 50 caracteres.')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios."),

    email: z
      .string()
      .min(1, 'El correo electrónico es obligatorio.')
      .email('El correo electrónico debe ser una dirección válida.'),

    phone: z
      .string()
      .min(9, "El teléfono debe tener 9 dígitos.")
      .max(9, "El teléfono debe tener 9 dígitos."),

    birth_date: z.preprocess((arg) => {
          if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg); 
          }
          return undefined;
        }, z
          .date({
            required_error: "El cumpleaños no es válido.",
          })
          .refine((date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const isBeforeBirthday = today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
            const adjustedAge = isBeforeBirthday ? age - 1 : age;
            return adjustedAge >= 16 && adjustedAge <= 60;
          },
          { message: "La edad debe estar entre 16 y 60 años." }
        )
      )
      .transform((date) => date.toISOString().split("T")[0]),

    status: z
      .enum(["Activo", "Inactivo"])
      .refine( 
        (value) => ["Activo", "Inactivo"].includes(value), 
        { message: 'El estado debe ser Activo o Inactivo.' } 
      )
      .transform((value) => value as string),
});

export type FormValues = z.infer<typeof schema>;