module.exports = {
    bindMenus(opco_id)
    {
        try
        {
            let parent_menu = Menus.find({
                parent_id: 0
            }).populate('submenus',{
                select: ['status'],
                where: {
                    opco_id: 1
                }
            });
            
            var tabs_menu = {};

            parent_menu.forEach(element => {
                tabs_menu[element.name] ={ is_enabled:  element.status }
                let sub_menu = Menus.find({
                    parent_id: element.parent_id
                }).populate('submenus',{
                    select: ['status'],
                    where: {
                        opco_id: 1
                    }
                });

                sub_menu.forEach(sub_elements => {
                    tabs_menu['sub_menu'][sub_elements.name] = { is_enabled:  sub_elements.status }
                });
            });
                      
            sails.log(tabs_menu);   
            return tabs_menu;         
        }
        catch(err)
        {
            return err
        }
    }
}