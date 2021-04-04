const AddRestaurant = () => (
  <div className='mb-4'>
    <form>
      <div className='form-row'>
        <div className='col'>
          <input type='text' className='form-control' placeholder='Name' />
        </div>
        <div className='col'>
          <input type='text' className='form-control' placeholder='Location' />
        </div>
        <div className='col'>
          {/* my-1 mr-sm-2 classes are deleted because they didn't make any sense on this select */}
          <select className='custom-select'>
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <button className='btn btn-primary'>Add</button>
      </div>
    </form>
  </div>
);

export default AddRestaurant;
