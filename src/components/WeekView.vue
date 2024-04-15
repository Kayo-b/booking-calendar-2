<template>
  <div class="week">
    <div class="day" v-for="(item, index) in weekDays" :key="index">
      <div class="date-first-row">
        <div class="day-name">{{ item.day.toLocaleDateString('en-US', { weekday: 'long' }) }}</div><span>{{
          item.day.getDate() }}</span>
      </div>

    </div>
    <div class="booking-column" v-for="(item) in weekDays">
      <div class="date" v-for="(item) in item.pickupArray">
        <div class="booking-pickup" @click="bookingDetails(item)">
          <img class="arrow" src="/src/components/icons/arrow-up-circle.svg">  Pickup
        </div>

      </div>
      <div v-for="(item) in item.dropoffArray">
        <div class="booking-dropoff" @click="bookingDetails(item)">
          <img class="arrow" src="/src/components/icons/arrow-down-circle.svg">Return
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import arrowUp from './icons/arrow-up-circle.svg';
import arrowDown from './icons/arrow-down-circle.svg';

export default {
  props: {
    startDate: Date,
    selectedStationBookings: Array,
  },
  components: {
    arrowUp,
    arrowDown
  },

  computed: {

    /* weekDays is the main property that is used throughout the app to structure the week calendar.
      It maps an array containing each day of the week and each array index receives an object containing
      its respective day, and two further arrays containing the booked pickups or returns(dropoffs) **/

    weekDays() {
      return Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(this.startDate);
        day.setDate(day.getDate() + index);
        let bookedDay;
        let pickupArray = [];
        let dropoffArray = [];
        let allBookings = this.selectedStationBookings.length;
        for (let i = 0; i < allBookings; i++) {
          if (day.toISOString().slice(0, 10) === this.selectedStationBookings[i]?.startDate.slice(0, 10)) {
            bookedDay = this.selectedStationBookings[i];
            pickupArray.push(bookedDay);
          }
          if (day.toISOString().slice(0, 10) === this.selectedStationBookings[i]?.endDate.slice(0, 10)) {
            bookedDay = this.selectedStationBookings[i];
            dropoffArray.push(bookedDay);
          }
        }
        return { day, pickupArray, dropoffArray };
      });
    }
  },
  methods: {
    bookingDetails(item) {
      this.$emit('booking-details', item);
    },
    emitWeekdays() {
      this.$emit('week-days', this.weekDays);
    },

  },
    watch: {
    // Watching startDate because the parent component must update its weekDays property after each startDate change 
    startDate: {
      handler() {
        this.$emit('week-days', this.weekDays); 
      },
    },
  },
  mounted() {
    this.emitWeekdays();
  }

}

</script>

<style scoped>
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  padding: 10px;
  background-color: #383838;
}

.booking-column {
  padding: 2px;
  background-color: #383838;
  min-height: 200px;
}

.booking-pickup {
  color: #17B700;
  background-color: #383838;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 2px;
  border: 2px solid transparent
}

.booking-dropoff {
  color: #E50A0A;
  background-color: #383838;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  border: 2px solid transparent
}

.date-first-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.booking-dropoff:hover,
.booking-pickup:hover {
  background-color: #383838;
  cursor: pointer;
  border: 2px solid rgb(28, 28, 28);
}

.arrow {
  height: 16px;
  width: 16px;
  margin-right: 1px;
}
</style>