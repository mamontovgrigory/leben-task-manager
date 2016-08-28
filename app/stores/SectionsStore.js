import React from "react";
import _ from "lodash";

class SectionsStore extends React.Component{
    constructor(){
        super();

        var sections = localStorage.getItem("sections"); //TODO: Temporary
        try{
            sections = sections ? JSON.parse(sections) : [];
        } catch(err){
            sections = [];
        }

        this.state = { sections: sections };
    }
    getList(){
        return this.state.sections;
    }
    getItem(params){
        var section = null;
        if(params){
            var sectionKey = _.findKey(this.state.sections, function(s) {
                var result = true;
                for (var key in params){
                    if(result){
                        result = s[key] == params[key];
                    }
                }
                return result;
            });
            section = this.state.sections[sectionKey];
        }
        return section;
    }
    save(section){
        if(section && section.name){
            var sections = this.state.sections;
            if(!section.id){
                section.id = 0;
                for(var i = 0; i < sections.length; i++){
                    if(!section.id || sections[i].id + 1 > section.id)
                        section.id = sections[i].id + 1;
                }
                section.note = 0;
                sections = _.concat(sections, [section]);
            } else {
                var sectionKey = _.findIndex(sections, function(s) {
                    return s.id == section.id;
                });
                sections[sectionKey] = section;
            }
            this.state.sections = sections;
            localStorage.setItem("sections", JSON.stringify(sections) ); //TODO: Temporary
        }
    }
    del(sectionId){
        if(typeof(sectionId) === "number"){
            var sections = this.state.sections;
            _.remove(sections, function(s) {
                return s.id == sectionId;
            });
            this.state.sections = sections;
            localStorage.setItem("sections", JSON.stringify(sections) ); //TODO: Temporary
        }
    }
}

const sectionsStore = new SectionsStore;
export default sectionsStore;