var equivalencia = {};
var escaperoomobj = {
  "mainsubject" : "Nova Inscrição Escape Room",
  "mainto" : "info@lim9.com",
  "clientfrom" : "info@lim9.com",
  "clientsubject" : "Lim9 Escape Room"
}
equivalencia["escaperoom"] = escaperoomobj;
if(body.service){
    var main = {
      from: 'Lim9 <info@lim9.com>',
      to: 'geral@viviancare.com',
      subject: 'Agendamento de Serviço',
      html: "" +
            // "<div><p>Foi efetuado um agendamento no website " + body.site.split("//")[1] + ".</p>" +
            "<p style='margin-top: 2em'><strong>DADOS DO AGENDAMENTO</strong></p>" +
            "<p><strong>Data: </strong>" + formatDate(body.date) + "</p>" +
            "<p><strong>Hora: </strong>" + body.hour + "</strong></p>" +
            "<p style='margin-top: 2em'><strong>DADOS DO CLIENTE</strong></p>" +
            "<p><strong>Nome: </strong>" + body.name + "</strong></p>" +
            "<p><strong>Contacto: </strong>" + body.phone + "</strong></p>" +
            "<p><strong>Email: </strong>" + body.email + "</strong></p>" +
            "<p><strong>Observações: </strong>" + body.obs + "</strong></p>" +
            "<p style='margin-top: 3em'>Para continuar o processamento desta reserva, clique num dos botões abaixo.</p>" +
            "<p style='padding: 1em; background-color: green; border: 1px solid darkgreen; margin-bottom: 1em; width: 6em; text-align: center; font-size: 1.5em'><a href='" + body.url + "/request/" + body.other.id + '?confirm=true&type=agendamento' + "' style='text-decoration:none; color: white'><strong>ACEITAR</strong></a></p>" +
            "<p style='padding: 1em; background-color: red; border: 1px solid #D00000; width: 6em; font-size: 1.5em; text-align: center;'><a href='" + body.url + "/request/" + body.other.id + '?confirm=false&type=agendamento' + "' style='text-decoration:none; color: white'><strong>CANCELAR</strong></a></p></div>"
    };

    var client = {
      from: 'VivianCare <geral@viviancare.com>',
      to: body.email,
      subject: 'Agendamento de Serviço',
      html: body.reservation.emails.client_email_mkd
        .replaceAll("{{cliente}}", body.name)
        .replaceAll("{{email}}", body.email)
        .replaceAll("{{phone}}", body.phone)
        .replaceAll("{{date}}", formatDate(body.date))
        .replaceAll("{{hour}}", body.hour)
        .replaceAll("{{obs}}", body.obs)
    };
  }
  else if(body.anythingiwant){

    var main = {
      from: 'Lim9 <info@lim9.com>',
      to: equivalencia[body.anythingiwant].mainto,
      subject: equivalencia[anythingiwant].mainsubject,
      html: body.main.damessage
    };

    var client = {
      from: equivalencia[anythingiwant].clientfrom,
      to: body.client.datofield,
      subject: equivalencia[anythingiwant].clientsubject,
      html: body.client.damessage
    };

  }

  else{
    var main = {
      from: 'Só Espeto <reservas@soespeto.com>',
      to: 'soespeto@lim9.com',
      subject: 'Reserva',
      html: "<div><p>Foi efetuada uma nova reserva no website " + body.site.split("//")[1] + ".</p>" +
            "<p style='margin-top: 2em'><strong>DADOS DA RESERVA</strong></p>" +
            "<p><strong>Data: </strong>" + formatDate(body.date) + "</p>" +
            "<p><strong>Hora: </strong>" + body.hour + "</strong></p>" +
            "<p><strong>Pessoas: </strong>" + body.people + "</strong></p>" +
            "<p style='margin-top: 2em'><strong>DADOS DO CLIENTE</strong></p>" +
            "<p><strong>Nome: </strong>" + body.name + "</strong></p>" +
            "<p><strong>Contacto: </strong>" + body.phone + "</strong></p>" +
            "<p><strong>Email: </strong>" + body.email + "</strong></p>" +
            "<p><strong>Observações: </strong>" + body.obs + "</strong></p>" +
            "<p style='margin-top: 3em'>Para continuar o processamento desta reserva, clique num dos botões abaixo.</p>" +
            "<p style='padding: 1em; background-color: green; border: 1px solid darkgreen; margin-bottom: 1em; width: 6em; text-align: center; font-size: 1.5em'><a href='" + body.url + "/request/" + body.other.id + '?confirm=true&type=reservas-min' + "' style='text-decoration:none; color: white'><strong>ACEITAR</strong></a></p>" +
            "<p style='padding: 1em; background-color: red; border: 1px solid #D00000; width: 6em; font-size: 1.5em; text-align: center;'><a href='" + body.url + "/request/" + body.other.id + '?confirm=false&type=reservas-min' + "' style='text-decoration:none; color: white'><strong>CANCELAR</strong></a></p></div>"
    };

    var client = {
      from: 'Só Espeto <reservas@soespeto.com>',
      to: body.email,
      subject: 'Reserva',
      html: body.reservation.emails.client_email_mkd
        .replaceAll("{{cliente}}", body.name)
        .replaceAll("{{email}}", body.email)
        .replaceAll("{{phone}}", body.phone)
        .replaceAll("{{date}}", formatDate(body.date))
        .replaceAll("{{hour}}", body.hour)
        .replaceAll("{{people}}", body.people)
        .replaceAll("{{obs}}", body.obs)
    };
  }
