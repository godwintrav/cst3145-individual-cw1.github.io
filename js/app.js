new Vue({
    el: '#app',
    data: {
        lessons: lessons,
        cartItems: [

        ],
        showProduct: true,
        searchTxt: '',
        order: 'asc',
        attribute: 'subject',
        sortOrders: {
            Ascending: 'asc',
            Descending: 'desc'
        },
        sortAttributes: {
            Subject: 'subject',
            Location: 'location',
            Price: 'price',
            Spaces: 'spaces'
        },
        checkOutName: '',
        checkOutNumber: '',
    },
    methods: {
        addLessonToCart: function(id){
            const lessonIndex = this.lessons.findIndex(lesson => lesson.id === id);
            if(lessonIndex != -1){
                this.lessons[lessonIndex].numOfSpaces -= 1;
                this.cartItems.push(id);
            } 
            
        },
        updateShowProduct: function(){
            this.showProduct = !this.showProduct;
        },
        removeLessonFromCart: function(index, id){
            const lessonIndex = this.lessons.findIndex(lesson => lesson.id === id);
            this.lessons[lessonIndex].numOfSpaces += 1;
            this.cartItems.splice(index, 1);
            
        },
        searchLessons: function(){
            this.lessons = lessons;
            console.log("searched");
            this.lessons = this.lessons.filter(lesson => lesson.subject.toLowerCase().includes(this.searchTxt) == true || lesson.location.toLowerCase().includes(this.searchTxt));
        },
        fetchLesson: function(id){
            const lessonIndex = this.lessons.findIndex(lesson => lesson.id === id);
            if(lessonIndex == -1){
                return;
            } 
            return this.lessons[lessonIndex];
        }
    },
    computed: {
        sortedLessons() {
            function compareSubjectAsc(a, b) {
                if(a.subject > b.subject) return 1;
                if(a.subject < b.subject) return -1;
                return 0;
            }
            function compareSubjectDesc(a, b) {
                if(a.subject > b.subject) return -1;
                if(a.subject < b.subject) return 1;
                return 0;
            }

            function compareLocationAsc(a, b) {
                if(a.location > b.location) return 1;
                if(a.location < b.location) return -1;
                return 0;
            }
            function compareLocationDesc(a, b) {
                if(a.location > b.location) return -1;
                if(a.location < b.location) return 1;
                return 0;
            }

            function comparePriceAsc(a, b) {
                if(a.price > b.price) return 1;
                if(a.price < b.price) return -1;
                return 0;
            }
            function comparePriceDesc(a, b) {
                if(a.price > b.price) return -1;
                if(a.price < b.price) return 1;
                return 0;
            }

            function compareSpacesAsc(a, b) {
                if(a.numOfSpaces > b.numOfSpaces) return 1;
                if(a.numOfSpaces < b.numOfSpaces) return -1;
                return 0;
            }
            function compareSpacesDesc(a, b) {
                if(a.numOfSpaces > b.numOfSpaces) return -1;
                if(a.numOfSpaces < b.numOfSpaces) return 1;
                return 0;
            }

            if(this.order == "asc"){
                if(this.attribute == "subject"){
                    return this.lessons.sort(compareSubjectAsc);
                } else if(this.attribute == "location"){
                    return this.lessons.sort(compareLocationAsc);
                } else if(this.attribute == "price"){
                    return this.lessons.sort(comparePriceAsc);
                } else{
                    return this.lessons.sort(compareSpacesAsc);
                }
                
            }else{
                if(this.attribute == "subject"){
                    return this.lessons.sort(compareSubjectDesc);
                } else if(this.attribute == "location"){
                    return this.lessons.sort(compareLocationDesc);
                } else if(this.attribute == "price"){
                    return this.lessons.sort(comparePriceDesc);
                } else{
                    return this.lessons.sort(compareSpacesDesc);
                }
            }
        },
        validateRegexCheckOut: function(){
            var nameRegexPattern = /^[A-Za-z]+$/;
            var numberRegexPattern = /^\d+$/;
            if(this.checkOutName.match(nameRegexPattern) && this.checkOutNumber.match(numberRegexPattern)){
                return true;
            }else{
                return false;
            }
        }
    }

});