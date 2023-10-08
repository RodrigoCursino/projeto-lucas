import moment from 'moment'

export const PaginationMixin = {
    data: () => ({
        activeOnly: true,
        timerSearch: () => {},
        isLoadingSave: false
    }),
    methods: {
        removeSpecialChars(str) {
            if(!str) {
                return str
            }
            
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        },

        checkOrderBy(key, parameter) {
            if(key && parameter == key.value) {
                return 'text-warning'
            }
        },
        
        genericOrderBy(payload, parameter, hasASC, key, auxParam){
            
            if(key) {
                key.value = parameter;
            }
            
            return payload.sort((a,b) => {
                if(hasASC) {
                    if(auxParam) {
                        if(a[parameter][auxParam] < b[parameter][auxParam]) {
                            return -1
                        }
                        if(a[parameter][auxParam] > b[parameter][auxParam]) {
                            return 1
                        }
                        
                        return 0
                        
                    } else {
                        if(a[parameter] < b[parameter]) {
                            return -1
                        }
                        if(a[parameter] > b[parameter]) {
                            return 1
                        }
                        
                        return 0
                    }
                } else {
                    if(auxParam) {
                        if(a[parameter][auxParam] > b[parameter][auxParam]) {
                            return -1
                        }
                        if(a[parameter][auxParam] < b[parameter][auxParam]) {
                            return 1
                        }
                        
                        return 0;
                    } else {
                        if(a[parameter] > b[parameter]) {
                            return -1
                        }
                        if(a[parameter] < b[parameter]) {
                            return 1
                        }
                        
                        return 0
                    }
                }
            })
        },
    
        sortByName(obj, prop) {
            return obj.sort((a,b) => {
                var x = a[prop].toLowerCase()
                var y = b[prop].toLowerCase()
                
                return x < y ? -1 : x > y ? 1 : 0
            })
        },
    
        keyPushSearch(input) {
            clearTimeout(this.timerSearch)
            this.timerSearch = setTimeout(() => {
                const listValues = input ? input.split(',').filter(String) : [];
                if(listValues.length > 0) {
                    this.txtSearch = []
                    listValues.forEach(x => {
                        if(this.txtSearch.filter(n => n.trim() === x.trim()).length === 0) {
                            this.txtSearch.push(this.removeSpecialChars(x))
                        }
                    })
                } else {
                    this.txtSearch = []
                }
            }, 800)
        }, 
    
        filterDataPagination(payload) {
            if(this.totalRows != payload.length) {
                this.totalRows = payload.length;
                this.currentPage = 1;
            }

            return payload.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
        },
    
        filterDataListBySearch(payload) {
            const _self = this;

            if(_self.txtSearch && _self.txtSearch.length === 0) {
                if(_self.activeOnly) {
                    return payload.filter(x => x.active);
                }

                return payload
            }

            if (payload.length > 0) {
                return payload.filter( t => {
                    if(_self.activeOnly) {
                        if(t.active && _self.txtSearch.filter ( x => {
                            if(
                                Object.keys(t).some( n => (JSON.stringify(t[n])+"").trim()
                                .replace(new RegExp ("\\ ", "gm"), "")
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                    x.trim().replace(new RegExp ("\\ ", "gm"), "")
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) > -1)) return x }).length > 0)
                    {
                        return t
                    }  
                    } else {
                        if(_self.txtSearch.filter( x => {
                            if(Object.keys(t).some( n => (JSON.stringify(t[n])+ "").trim()
                                .replace(new RegExp("\\ ","gm"), "")
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                    x.trim().replace(new RegExp("\\ ", "gm"), "")
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
                                    .toLowerCase()) > -1))
                                    return x}).length > 0){
                                return t
                            }  
                    }
                });
            } else {
                return payload
            }
        },
    },

    filters: {
        filterDateToString(date) {
            if(!date) {
                return ''
            }

            return new Date(date).toLocaleDateString()
        },

        filterDateTime(date) {
            if(!date || date === "0001-01-01T00:00:00") {
                return ''
            }

            return new Date(date).toLocaleDateString()
        },

        filterDateMoment(date) {
            if(!date) {
                return ''
            }
            
            return moment(date,"DD/MM/YYYY").format("DD/MM/YYYY")
        },

        filterDate(date) {
            if(!date) {
                return ''
            }
            
            return new Date(date).toLocaleDateString().split(' ')[0]
        }
    }

}