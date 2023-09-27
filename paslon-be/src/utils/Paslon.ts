import * as Joi from 'joi'

export const createTodoSchema = Joi.object({
  name: Joi.string().required().min(10).messages({
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama harus memiliki setidaknya 10 karakter',
  }),
  visi: Joi.string().required().messages({
    'string.empty': 'Nama tidak boleh kosong',
  }),
  image: Joi.string().required().messages({
    'string.empty': 'Nama tidak boleh kosong',
  }),
})