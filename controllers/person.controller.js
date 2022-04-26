const { Op } = require("sequelize");
const Person = require("../models/Person");

const PersonController = {
  async listar(req, res) {
    // valor default
    const { termo, page = 1, limit = 30 } = req.query;
    const offset = parseInt(limit) * (parseInt(page) - 1);

    let filter = {};

    if (termo) {
      Object.assign(filter, {
        where: {
          //person_name: { [Op.like]: `%${termo}%` } isso é igual a linha de baixo,
          person_name: { [Op.substring]: termo },
        },
      });
    }

    const Persons = await Person.findAll(filter);

    res.json(Persons);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    await Person.update(
      {
        person_name: nome,
      },
      {
        where: {
          person_id: id,
        },
      }
    );

    // if (personUpdated[0] != 1) {
    //   return res.status(400).json("Error ao tentar atuaizar");
    // }

    // return res.json(nome);

    const personUpdated = await Person.findByPk(id);
    // const personUpdated = await Person.find({
    //   where:{
    //     person_id: id
    //   }
    // })

    return res.json(personUpdated);
  },
};

module.exports = PersonController;
