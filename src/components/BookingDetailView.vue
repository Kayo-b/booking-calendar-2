<template>
<div class="test-container">
<div @click="hide" :class="{ modalBackground: isVisible }"></div>
    <div class="main-container" :style="{ display: isVisible ? 'block' : 'none'}">
        <div class="booking-detail-view">
            <div class="booking-detail-view-header">
                <h3>Booking Details</h3>
                <div class="btn-container"> <button @click="hide" class="back-btn">Back</button></div>
            </div>
            <div class="booking-grid">
             <div v-for="(detail, index) in bookingDetails" :key="index">
                <div class="booking-detail-view-content-booking">
                    <div class="booking-detail-label">{{ detail.label }}</div>
                    <div class="booking-detail-value"> &nbsp{{ detail.value }}</div>
                </div>
            </div>   
            </div>
        </div>
    </div>
</div>
</template>

  <script>
    export default {
        data() {
            return {
                isVisible: false,
            }
        },
        props: {
            booking: Object,
            clicked: Boolean,
            stationName: String
        },
        watch: {
            clicked() {
                this.show();
            },
        },
        computed: {
            // Setting the grid content in an object so it can be iteratively displayed using v-for.
            bookingDetails() {
                return [
                    {label: 'Booking ID: ', value: this.booking.id},
                    {label: 'Customer Name: ', value: this.booking.customerName},
                    {label: 'Start Date: ', value: this.booking.startDate?.slice(0,10)},
                    {label: 'End Date: ', value: this.booking.endDate?.slice(0,10)},
                    {label: 'Duration: ', value: Math.floor(( new Date(this.booking.startDate).getTime() - new Date(this.booking.endDate).getTime()) / (1000 * 3600 * 24) * -1) + ' days'},
                    {label: 'Station: ', value: this.stationName}
                ]
            }
        },
        methods: {
            show() {
               this.isVisible = !this.isVisible
            },
            hide() {
                this.isVisible = !this.isVisible;
            },
        }
    }
    </script>
<style scoped>
    .test-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .modalBackground {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        visibility: visible;
    }
    .main-container {
        position: absolute;
        justify-content: center;
        align-items: center;
        top: 10%;
        background-color: black; 
    }
    .booking-detail-view {
        width: 600px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
    }
    .booking-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;

    }
    .booking-detail-view-header {
        text-align: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 20px;
        color: white
    }
    .booking-detail-view-content-booking {
        display: flex;
        margin: 5px;
    }
    .booking-detail-label {
        font-weight: bold;
    }
    .booking-detail-value {
        flex: 1;
    }
    .btn-container {
        display: flex;
    }
    .back-btn {
        background-color: transparent;
        border: 1px solid gray;
        border-radius: 5px ;
        color: white;
        margin: 0px;
    }
    .back-btn:hover {
        cursor: pointer;
        background-color: gray;
    }
    @media (max-width: 600px) {
        .booking-grid {
            display: flex;
            flex-direction: column;
        }
        .booking-detail-view {
            width: 100%;
        }
    }

</style>