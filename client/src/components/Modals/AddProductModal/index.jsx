import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
  borderRadius: '4px',
  marginTop: '8px',
});

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  images: Yup.array().of(Yup.string().url('Invalid URL')).max(3, 'You can add up to 3 images'),
});

const AddProductModal = ({ open, handleClose, onAdd }) => {
  const handleSubmit = (values) => {
    onAdd(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: '',
            price: '',
            description: '',
            category: '',
            images: ['', '', ''],
            inStock: true,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Product Name"
                    name="name"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      label="Category"
                      onChange={(e) => setFieldValue('category', e.target.value)}
                    >
                      <MenuItem value="Paint">Paint</MenuItem>
                      <MenuItem value="Sanitary">Sanitary</MenuItem>
                      <MenuItem value="Hardware">Hardware</MenuItem>
                      <MenuItem value="Installation_services">Installation_services</MenuItem>
                    </Field>
                    <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                {[0, 1, 2].map((index) => (
                  <Grid item xs={12} key={index}>
                    <Field
                      as={TextField}
                      label={`Image URL ${index + 1}`}
                      name={`images[${index}]`}
                      fullWidth
                      placeholder={`Paste image URL ${index + 1} here`}
                      helperText={<ErrorMessage name={`images[${index}]`} />}
                    />
                    {values.images[index] && (
                      <ImagePreview src={values.images[index]} alt={`Product Preview ${index + 1}`} />
                    )}
                    {values.images[index] && (
                      <IconButton
                        onClick={() => window.open(values.images[index], '_blank')}
                        color="primary"
                      >
                        <ImageIcon />
                      </IconButton>
                    )}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="In Stock"
                    name="inStock"
                    type="checkbox"
                    checked={values.inStock}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button type="button" onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Product
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
