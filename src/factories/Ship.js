const Ship = (id, length, vertical) => {
  let shipHealth = length;
  let sunkStatus = false;
  
  const sunk = () => {
    return obj.sunkStatus = true;
  }
  
const damage = (x) => {
   let updatedHealth = obj.shipHealth -= x;
  if(updatedHealth <= 0) {
    sunk();
  }
};

  const attacked = (hit) => {
    if( hit === true) {
     damage(1);
    return true

    }
  }
  const obj = {id ,length, vertical, sunkStatus, shipHealth, attacked};
  return obj
};

export default Ship;