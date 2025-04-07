const express = require('express');
const router = express.Router();
const Monster = require('../models/Monster');
const bodyParser = require('body-parser');

router.use(bodyParser.text({ type: '*/xml' }));

// Ruta para el WSDL o menú general SOAP
router.get('/', async (req, res) => {
  if (req.url.includes('?wsdl')) {
    const wsdl = `
      <?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
                   xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
                   xmlns:tns="http://localhost:8090/YuGiOhService.svc"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   name="YuGiOhService"
                   targetNamespace="http://localhost:8090/YuGiOhService.svc">

        <message name="GetAllMonstersRequest" />
        <message name="GetAllMonstersResponse">
          <part name="result" type="xsd:string"/>
        </message>

        <message name="GetMonsterByIdRequest">
          <part name="id" type="xsd:string"/>
        </message>
        <message name="GetMonsterByIdResponse">
          <part name="name" type="xsd:string"/>
        </message>

        <message name="CreateMonsterRequest">
          <part name="name" type="xsd:string"/>
        </message>
        <message name="CreateMonsterResponse">
          <part name="message" type="xsd:string"/>
        </message>

        <message name="DeleteMonsterRequest">
          <part name="id" type="xsd:string"/>
        </message>
        <message name="DeleteMonsterResponse">
          <part name="message" type="xsd:string"/>
        </message>

        <portType name="YuGiOhPortType">
          <operation name="GetAllMonsters">
            <input message="tns:GetAllMonstersRequest"/>
            <output message="tns:GetAllMonstersResponse"/>
          </operation>
          <operation name="GetMonsterById">
            <input message="tns:GetMonsterByIdRequest"/>
            <output message="tns:GetMonsterByIdResponse"/>
          </operation>
          <operation name="CreateMonster">
            <input message="tns:CreateMonsterRequest"/>
            <output message="tns:CreateMonsterResponse"/>
          </operation>
          <operation name="DeleteMonster">
            <input message="tns:DeleteMonsterRequest"/>
            <output message="tns:DeleteMonsterResponse"/>
          </operation>
        </portType>

        <binding name="YuGiOhBinding" type="tns:YuGiOhPortType">
          <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
          <operation name="GetAllMonsters">
            <soap:operation soapAction="GetAllMonsters"/>
            <input><soap:body use="literal"/></input>
            <output><soap:body use="literal"/></output>
          </operation>
          <operation name="GetMonsterById">
            <soap:operation soapAction="GetMonsterById"/>
            <input><soap:body use="literal"/></input>
            <output><soap:body use="literal"/></output>
          </operation>
          <operation name="CreateMonster">
            <soap:operation soapAction="CreateMonster"/>
            <input><soap:body use="literal"/></input>
            <output><soap:body use="literal"/></output>
          </operation>
          <operation name="DeleteMonster">
            <soap:operation soapAction="DeleteMonster"/>
            <input><soap:body use="literal"/></input>
            <output><soap:body use="literal"/></output>
          </operation>
        </binding>

        <service name="YuGiOhService">
          <port name="YuGiOhPort" binding="tns:YuGiOhBinding">
            <soap:address location="http://localhost:8090/YuGiOhService.svc"/>
          </port>
        </service>
      </definitions>
    `;
    res.set('Content-Type', 'text/xml');
    return res.send(wsdl);
  }

  const menu = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <AvailableOperations>
          <Operation>GetAllMonsters</Operation>
          <Operation>GetMonsterById</Operation>
          <Operation>CreateMonster</Operation>
          <Operation>DeleteMonster</Operation>
        </AvailableOperations>
      </soap:Body>
    </soap:Envelope>
  `;
  res.type('application/xml').send(menu);
});

// Ruta POST tipo SOAP para ejecutar funciones
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    if (body.includes('<GetAllMonsters')) {
      const monsters = await Monster.find().limit(5);
      const monsterList = monsters.map(m => m.name).join(', ');

      return res.type('application/xml').send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetAllMonstersResponse>${monsterList}</GetAllMonstersResponse>
          </soap:Body>
        </soap:Envelope>
      `);
    }

    if (body.includes('<GetMonsterById')) {
      const match = body.match(/<id>(.*?)<\/id>/);
      const id = match ? match[1] : null;
      const monster = await Monster.findById(id);

      return res.type('application/xml').send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetMonsterByIdResponse>${monster ? monster.name : 'No encontrado'}</GetMonsterByIdResponse>
          </soap:Body>
        </soap:Envelope>
      `);
    }

    if (body.includes('<CreateMonster')) {
      const match = body.match(/<name>(.*?)<\/name>/);
      const name = match ? match[1] : 'Desconocido';

      const newMonster = new Monster({ name });
      await newMonster.save();

      return res.type('application/xml').send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <CreateMonsterResponse>Monstruo creado con ID ${newMonster._id}</CreateMonsterResponse>
          </soap:Body>
        </soap:Envelope>
      `);
    }

    if (body.includes('<DeleteMonster')) {
      const match = body.match(/<id>(.*?)<\/id>/);
      const id = match ? match[1] : null;
      await Monster.findByIdAndDelete(id);

      return res.type('application/xml').send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <DeleteMonsterResponse>Monstruo eliminado (si existía)</DeleteMonsterResponse>
          </soap:Body>
        </soap:Envelope>
      `);
    }

    return res.status(400).type('application/xml').send(`
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Error>Acción no reconocida</Error>
        </soap:Body>
      </soap:Envelope>
    `);
  } catch (error) {
    return res.status(500).type('application/xml').send(`
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Error>${error.message}</Error>
        </soap:Body>
      </soap:Envelope>
    `);
  }
});

module.exports = router;
