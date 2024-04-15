<template>
    <div class="main-container">
        <div class="header-container">
            <div class="week-nav">
                <div class="icon-container" @click="goToPreviousWeek">
                    <!-- <ArrowLeft class="arrow" /> -->
                    <img class="arrow" src="/src/components/icons/arrow-prev-small.svg" >
                </div>
                <div class="week-container">
                    <div class="week-range" v-for="(item, index) in weekDays">
                        <div class="date-1">{{ index === 0 ? `${item.day.getDate()}.${item.day.getMonth() +
                            1}.${item.day.getFullYear()}` : '' }}</div>
                        <div class="date-2">{{ index === 6 ? `${item.day.getDate()}.${item.day.getMonth() +
                            1}.${item.day.getFullYear()}` : '' }}</div>
                    </div>
                </div>

                <div class="icon-container" @click="goToNextWeek">
                    <!-- <ArrowRight class="arrow" /> -->
                    <img class="arrow" src="/src/components/icons/arrow-next-small.svg" >
                </div>
            </div>
            <RentalStationSelector class="station-selection" :stations="stations" @station-selected="stationSelected" />
        </div>
        <WeekView :key="renderKey" :startDate="startDate" :selectedStationBookings="selectedStationBookings"
            @booking-details="bookingDetails" @week-days="updateWeekDays" />
        <BookingDetailView :booking="booking" :clicked="clicked" :stationName="stationName" />
    </div>
</template>
<script>
import WeekView from './components/WeekView.vue';
import RentalStationSelector from './components/RentalStationSelector.vue';
import BookingDetailView from './components/BookingDetailView.vue';
import ArrowLeft from './components/icons/arrow-prev-small.svg';
import ArrowRight from './components/icons/arrow-next-small.svg';


export default {
    components: {
        RentalStationSelector,
        WeekView,
        BookingDetailView,
        ArrowLeft,
        ArrowRight

    },
    data() {
        return {
            // Set start date to 08.03.22 so that the bookings can be easily 
            // seen without needing to manually go back 2 years.
            startDate: new Date("2021-03-08T22:04:19.032Z"),
            stations: [],
            selectedStationBookings: [],
            booking: {},
            clicked: false,
            stationName: null,
            weekDays: [],
            renderKey: 0
        }
    },
    // Calling the API and adjusting the date on mount 
    mounted() {
        this.adjustStartDateToBeginningOfWeek();
        this.fetchStationsBookingData();

        /**Increment renderKey value to re-render WeekView component:
         * The weekDays Obj is generated in WeekView component and 
         * its value is changing on mount but WeekView isn't reacting
         * to it when it first mounts. This workaround enables the 
         * display of the correct week on the first render. **/
        this.renderKey++;
    },
    methods: {
        // Adjusts the start date to be Monday,
        // without this the calendar will beggin on Saturday
        adjustStartDateToBeginningOfWeek() {
            const dayOfWeek = this.startDate.getDay();
            const diff = this.startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            this.startDate.setDate(diff);
        },
        // Setting forward and backwards button to navigate through the weeks
        goToPreviousWeek() {
            this.changeWeekBy(-7);
        },
        goToNextWeek() {
            this.changeWeekBy(7);
        },
        changeWeekBy(days) {
            const newDate = new Date(this.startDate.valueOf());
            newDate.setDate(this.startDate.getDate() + days);
            this.startDate = newDate;
            this.adjustStartDateToBeginningOfWeek();
        },
        fetchStationsBookingData() {
            fetch('https://605c94c36d85de00170da8b4.mockapi.io/stations')
                .then(response => response.json())
                .then(data => {
                    this.stations = data;
                }).catch(error => {
                    console.error("Error on fetch", error)
                });
        },
        /**
         * stationSelected receives the station ID from RentalStationSelector component via $emit 
         * and uses it to set the current station bookings and name that should be displayed */
        stationSelected(stationId) {
            const station = this.stations.find(station => station.id === stationId);
            this.selectedStationBookings = station ? station.bookings : [];
            this.stationName = station ? station.name : null;
        },

        bookingDetails(item) {
            this.booking = item ? item : {};
            this.clicked = !this.clicked;
        },
        updateWeekDays(weekDays) {
            this.weekDays = weekDays ? weekDays : [];
        }

    }
}
</script>

<style scoped>
.main-container {
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    max-width: 100%;
}

.week-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 200px;
}

.week-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5px;
    padding-left: 170px;
}

.header-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
}

.date-1,
.date-2 {
    color: white;
    margin: 1px;
    font-size: large;
    color: rgba(232, 232, 232, 0.685)
}

.icon-container {
    height: 40px;
    width: 40px;
    margin: 0px 18px 0px 18px;
}

.arrow {
    cursor: pointer;
    height: 40px;
    width: 40px;
    filter: invert(50%);
    padding: -10px;
}

.arrow:hover {
    filter: invert(100%);
}

.station-selection {
    width: 200px;
    height: 30px;
    font-size: large;
    background-color: #383838;
    color: rgba(232, 232, 232, 0.685)
}

.station-selection:hover {
    cursor: pointer;
}

@media (max-width: 720px) {
    .week-nav {
        padding-left: 0px;
    }

    .icon-container {
        height: 30px;
        width: 30px;
    }

    .arrow {
        height: 30px;
        width: 30px;
    }

    .station-selection {
        width: 150px;
        height: 25px;
        font-size: medium;
    }
}
</style>