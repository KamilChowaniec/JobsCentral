import React, { Component } from "react";
import { Modal, Form, Input, Icon, Upload } from "antd";
import axios from "axios";

const AddJobOfferForm = Form.create({ name: "form_in_modal" })(
  class extends Component {
    render() {
      const { visible, onCancel, onAdd, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Dodaj ofertę pracy"
          okText="Dodaj ofertę"
          cancelText="Anuluj"
          onCancel={onCancel}
          onOk={onAdd}
        >
          <Form layout="vertical">
            <Form.Item>
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Wprowadź tytuł!" }]
              })(<Input placeholder="Tytuł" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("position", {
                rules: [{ required: true, message: "Wprowadź pozycję!" }]
              })(<Input placeholder="Pozycja" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("firm", {
                rules: [{ required: true, message: "Wprowadź nazwę firmy!" }]
              })(<Input placeholder="Nazwa firmy" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("city", {
                rules: [{ required: true, message: "Wprowadź miasto!" }]
              })(<Input placeholder="Miasto" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("street", {
                rules: [{ required: true, message: "Wprowadź ulicę!" }]
              })(<Input placeholder="Ulica" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("number", {
                rules: [{ required: true, message: "Wprowadź numer!" }]
              })(<Input placeholder="Numer" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("dimensions", {
                rules: [{ required: true, message: "Wprowadź wymiar pracy!" }]
              })(<Input placeholder="Wymiar pracy" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "Wprowadź opis!" }]
              })(<Input type="textarea" placeholder="Opis" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("tags", {
                rules: [{ required: true, message: "Wprowadź tagi!" }]
              })(<Input placeholder="Tagi" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("logo", {
                rules: []
              })(
                <div className="dropbox">
                  <Upload.Dragger
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    beforeUpload={file => {
                      this.props.handleFile(file);
                      return false;
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Kliknij lub przeciągnij zdjęcie
                    </p>
                    <p className="ant-upload-hint">
                      Obsługiwane formaty zdjęć: jpg, jpeg, png.
                    </p>
                  </Upload.Dragger>
                </div>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class AddJobOfferModal extends Component {
  state = {
    file: null
  };

  handleFile = file => {
    this.setState({ file });
    console.log(file);
  };

  handleCancel = () => {
    this.props.onHide();
  };

  handleAdd = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("logo", this.state.file);
        formData.append("position", values.position);
        formData.append("firm", values.firm);
        formData.append("city", values.city);
        formData.append("street", values.street);
        formData.append("number", values.number);
        formData.append("dimensions", values.dimensions);
        formData.append("description", values.description);
        formData.append("tags", values.tags);
        const config = {
            headers: {
                'x-auth-token':localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/api/jobOffers",formData, config)
            .then((response) => {
                alert("Oferta pracy dodana pomyślnie!");
            }).catch((error) => {
        });
        form.resetFields();
        this.props.onHide();
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <AddJobOfferForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          onAdd={this.handleAdd}
          handleFile={this.handleFile}
        />
      </div>
    );
  }
}

const WrappedAddJobOfferModal = Form.create({ name: "add_job_offer_modal" })(
  AddJobOfferModal
);

export default WrappedAddJobOfferModal;
