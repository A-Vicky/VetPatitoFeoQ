<template>
  <q-page class=" bg-violet text-midnight">
    <q-btn
      rounded
      label="Add Appointment"
      icon="assignment"
      color="cadet"
      style="margin-left:80%;margin-top:3%"
      to="/app/newappointment"
    ></q-btn>
    <q-separator horizontal class="transparent" />
    <center>
      <q-table
        grid
        card-class="bg-midnight text-white"
        title="Appointments"
        :data="data"
        :columns="columns"
        row-key="name"
        hide-header
        style="width:80%"
      >
      </q-table>
    </center>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      client: require("graphql-client")({
        url: "http://127.0.0.1:8000/graphql"
      }),
      columns: [
        {
          name: "description",
          required: true,
          align: "left",
          field: row => row.description,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "date",
          field: "date",
          sortable: true
        },
        { name: "petname", label: "Pet: ", field: "petname", sortable: true },
        {
          name: "profname",
          label: "Attended by: ",
          field: "profname",
          sortable: true
        },
        {
          name: "comments",
          label: "Comments:",
          field: "comments",
          sortable: true
        }
      ],
      data: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allAppointments { edges { node { id, description, comments, date, pet { firstName, lastName }, profesional { firstName, firstLname} }  }   } }",
        {}
      )
      .then(function(body) {
        console.log(body);
        body.data.allAppointments.edges.forEach(element => {
          var temp = {
            profname: "",
            petname: "",
            comments: "",
            description: "",
            date: ""
          };
          temp.profname =
            element.node.profesional.firstName +
            " " +
            element.node.profesional.firstLname;
          temp.petname =
            element.node.pet.firstName + " " + element.node.pet.lastName;
          temp.comments = element.node.comments;
          temp.description = element.node.description;
          temp.date = element.node.date;
          console.log(temp);
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.data = info;
  }
};
</script>
